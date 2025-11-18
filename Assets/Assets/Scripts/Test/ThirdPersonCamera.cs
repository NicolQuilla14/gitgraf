using UnityEngine;

public class ThirdPersonCamera : MonoBehaviour
{
    public Transform target;
    public Vector3 offset = new Vector3(0f, 3f, -0f);
    public float rotationSpeed = 5f;
    public float mouseSensitivity = 2f;

    private float mouseX;
    private float mouseY;

    void LateUpdate()
    {
        if (target == null) return;

        // Rotación de la cámara con el mouse
        mouseX += Input.GetAxis("Mouse X") * mouseSensitivity;
        mouseY -= Input.GetAxis("Mouse Y") * mouseSensitivity;
        mouseY = Mathf.Clamp(mouseY, -35f, 60f);

        // Rotar alrededor del objetivo
        Quaternion rotation = Quaternion.Euler(mouseY, mouseX, 0);
        Vector3 desiredPosition = target.position + rotation * offset;

        transform.position = desiredPosition;
        transform.LookAt(target.position + Vector3.up * 1.5f); // Mira al pecho del personaje
    }
}
