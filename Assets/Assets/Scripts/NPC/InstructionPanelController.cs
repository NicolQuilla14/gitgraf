using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class InstructionPanelController : MonoBehaviour
{
    public GameObject panel;          // El panel que aparecerá después de 2 segundos
    public TMP_Text messageText;      // Texto con TextMeshPro
    public Button nextButton;         // Botón para avanzar
    public Button exitButton;         // Botón para cerrar el panel

    // Lista de mensajes para mostrar
    [TextArea]
    public string[] messages;

    private int currentMessageIndex = 0;

    void Start()
    {
        // Aseguramos que el panel comience oculto
        if (panel != null)
            panel.SetActive(false);

        exitButton.gameObject.SetActive(false);  // El botón salir no aparece todavía

        // Inicia la secuencia de aparición
        Invoke("ShowPanel", 2f);
    }

    void ShowPanel()
    {
        panel.SetActive(true);
        currentMessageIndex = 0;

        // Mostrar primer mensaje
        if (messages.Length > 0)
            messageText.text = messages[0];

        nextButton.onClick.AddListener(NextMessage);
        exitButton.onClick.AddListener(ExitPanel);
    }

    void NextMessage()
    {
        currentMessageIndex++;

        // Si quedan mensajes, mostrarlos
        if (currentMessageIndex < messages.Length)
        {
            messageText.text = messages[currentMessageIndex];

            // Si ya es el último mensaje, mostramos botón salir
            if (currentMessageIndex == messages.Length - 1)
            {
                nextButton.gameObject.SetActive(false);
                exitButton.gameObject.SetActive(true);
            }
        }
    }

    void ExitPanel()
    {
        Destroy(panel);   // Se destruye el panel completamente
    }
}
