using UnityEngine;

public class TogglePanels : MonoBehaviour
{
    public GameObject tabPanel;   // Panel que se activa con TAB
    public GameObject tPanel;     // Panel que se activa con T

    private void Start()
    {
        if (tabPanel != null)
            tabPanel.SetActive(false);

        if (tPanel != null)
            tPanel.SetActive(false);
    }

    void Update()
    {
        // Alternar TAB
        if (Input.GetKeyDown(KeyCode.Tab))
        {
            if (tabPanel != null)
                tabPanel.SetActive(!tabPanel.activeSelf);
        }

        // Alternar T
        if (Input.GetKeyDown(KeyCode.T))
        {
            if (tPanel != null)
                tPanel.SetActive(!tPanel.activeSelf);
        }
    }
}
