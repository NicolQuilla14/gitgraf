using UnityEngine;
using UnityEngine.UI;

public class Interaction : MonoBehaviour
{
    public GameObject showOnEnter;     // Objeto que aparece al entrar (A)
    public GameObject showOnInteract;  // Objeto que aparece al presionar E (B)
    public Button exitButton;          // Botón para cerrar el panel B

    private bool playerInside = false;

    void Start()
    {
        if (showOnEnter != null)
            showOnEnter.SetActive(false);

        if (showOnInteract != null)
            showOnInteract.SetActive(false);

        if (exitButton != null)
            exitButton.onClick.AddListener(CloseInteractObject);
    }

    void Update()
    {
        if (playerInside)
        {
            if (Input.GetKeyDown(KeyCode.E))
            {
                if (showOnInteract != null)
                    showOnInteract.SetActive(true);
            }
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            playerInside = true;

            if (showOnEnter != null)
                showOnEnter.SetActive(true);
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            playerInside = false;

            if (showOnEnter != null)
                showOnEnter.SetActive(false);

            if (showOnInteract != null)
                showOnInteract.SetActive(false);
        }
    }

    // Botón Salir
    void CloseInteractObject()
    {
        if (showOnInteract != null)
            showOnInteract.SetActive(false);
    }
}
