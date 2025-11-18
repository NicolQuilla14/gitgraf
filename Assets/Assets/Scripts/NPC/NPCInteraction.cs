using UnityEngine;
using UnityEngine.UI;

public class NPCInteraction : MonoBehaviour
{
    public GameObject interactionCanvas;      
    public GameObject autoShowObject;         
    public Animator npcAnimator;              

    private bool playerInRange = false;
    private bool isInteracting = false;      

    void Start()
    {
        if (interactionCanvas != null)
            interactionCanvas.SetActive(false);

        if (autoShowObject != null)
            autoShowObject.SetActive(false); 
    }

    void Update()
    {
        if (playerInRange && !isInteracting)
        {
            if (Input.GetKeyDown(KeyCode.E))
            {
                if (interactionCanvas != null)
                {
                    interactionCanvas.SetActive(true);
                    isInteracting = true;
                }

                if (npcAnimator != null)
                    npcAnimator.SetBool("talk", true);
            }
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            playerInRange = true;

            // Activamos el objeto automático al entrar
            if (autoShowObject != null)
                autoShowObject.SetActive(true);
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            playerInRange = false;

            if (interactionCanvas != null)
                interactionCanvas.SetActive(false);

            if (npcAnimator != null)
                npcAnimator.SetBool("talk", false);

            isInteracting = false;

            // Desactivar el objeto automático al salir
            if (autoShowObject != null)
                autoShowObject.SetActive(false);
        }
    }

    public void CloseInteraction()
    {
        if (interactionCanvas != null)
            interactionCanvas.SetActive(false);

        if (npcAnimator != null)
            npcAnimator.SetBool("talk", false);

        isInteracting = false;
    }
}
