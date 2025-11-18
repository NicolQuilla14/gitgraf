using Unity.Netcode;
using UnityEngine;

public class Anim : NetworkBehaviour
{
    private Animator animator;

    private float x, y;

    public override void OnNetworkSpawn()
    {
        animator = GetComponent<Animator>();
        if (!IsOwner) return;
    }

    private void Update()
    {
        if (!IsOwner) return;

        x = Input.GetAxis("Horizontal");
        y = Input.GetAxis("Vertical");

        animator.SetFloat("velX", x);
        animator.SetFloat("velY", y);

        // Llama al servidor para sincronizar la animación con los demás
        UpdateAnimationServerRpc(x, y);
    }

    [ServerRpc]
    private void UpdateAnimationServerRpc(float velX, float velY)
    {
        // Transmitir a los otros clientes
        UpdateAnimationClientRpc(velX, velY);
    }

    [ClientRpc]
    private void UpdateAnimationClientRpc(float velX, float velY)
    {
        if (IsOwner) return; // Ya fue manejado localmente

        animator.SetFloat("velX", velX);
        animator.SetFloat("velY", velY);
    }
}
