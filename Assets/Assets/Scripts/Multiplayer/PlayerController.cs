using Unity.Netcode;
using UnityEngine;
using UnityEngine.Rendering.Universal;

[RequireComponent(typeof(CharacterController))]
public class PlayerController : NetworkBehaviour
{
    [Header("Movement Settings")]
    public float moveSpeed = 5f;
    public float runSpeedMultiplier = 2f;
    public float gravity = -9.81f;

    private CharacterController controller;
    private Vector3 velocity;
    private Transform cam;

    [Header("Camera Settings")]
    public Vector3 cameraOffset = new Vector3(0, 3f, -5f);
    public float cameraSmooth = 10f;
    public float mouseSensitivity = 3f;
    private GameObject playerCamera;

    private float yaw = 0f;

    private Animator animator;

    private bool isCursorLocked = true;

    public override void OnNetworkSpawn()
    {
        controller = GetComponent<CharacterController>();
        animator = GetComponent<Animator>();

        if (IsOwner)
        {
            LockCursor(true);

            if (playerCamera != null)
                Destroy(playerCamera);

            playerCamera = new GameObject("PlayerCamera");

            var camComponent = playerCamera.AddComponent<Camera>();
            playerCamera.AddComponent<AudioListener>();

            var urpCamData = playerCamera.AddComponent<UniversalAdditionalCameraData>();
            urpCamData.renderPostProcessing = true;

            DontDestroyOnLoad(playerCamera);

            cam = playerCamera.transform;

            cam.position = transform.position + transform.TransformDirection(cameraOffset);
            cam.LookAt(transform.position + Vector3.up * 1.5f);
        }
    }

    private void Update()
    {
        if (!IsOwner) return;

        if (Input.GetKeyDown(KeyCode.Escape))
        {
            isCursorLocked = false;
            LockCursor(isCursorLocked);
        }

        if (!isCursorLocked && Input.GetKeyDown(KeyCode.P))
        {
            isCursorLocked = true;
            LockCursor(isCursorLocked);
        }

        if (!isCursorLocked) return;

        HandleCameraRotation();
        HandleMovement();
        HandleCameraPosition();
    }


    private void LockCursor(bool locked)
    {
        if (locked)
        {
            Cursor.lockState = CursorLockMode.Locked;
            Cursor.visible = false;
        }
        else
        {
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }
    }

    private void HandleCameraRotation()
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
        yaw += mouseX;
        transform.rotation = Quaternion.Euler(0f, yaw, 0f);
    }

    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        Vector3 camForward = Vector3.Scale(cam.forward, new Vector3(1, 0, 1)).normalized;
        Vector3 camRight = cam.right;

        Vector3 moveDirection = (camForward * vertical + camRight * horizontal).normalized;

        bool isMoving = moveDirection.magnitude >= 0.1f;
        bool isRunning = Input.GetKey(KeyCode.LeftShift) && isMoving;
        float currentSpeed = isRunning ? moveSpeed * runSpeedMultiplier : moveSpeed;

        if (isMoving)
        {
            controller.Move(moveDirection * currentSpeed * Time.deltaTime);
        }

        if (controller.isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;
        }

        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);

        if (animator != null)
        {
            animator.SetBool("isRunning", isRunning);
        }
    }

    private void HandleCameraPosition()
    {
        if (cam == null) return;

        Vector3 targetPosition = transform.position + Vector3.up * 1.5f;
        Vector3 desiredCameraPosition = targetPosition + transform.TransformDirection(cameraOffset);

        Vector3 direction = (desiredCameraPosition - targetPosition).normalized;
        float maxDistance = cameraOffset.magnitude;

        RaycastHit hit;
        if (Physics.SphereCast(targetPosition, 0.2f, direction, out hit, maxDistance))
        {
            cam.position = targetPosition + direction * (hit.distance - 0.1f);
        }
        else
        {
            cam.position = desiredCameraPosition;
        }
        cam.LookAt(targetPosition);
    }
}
