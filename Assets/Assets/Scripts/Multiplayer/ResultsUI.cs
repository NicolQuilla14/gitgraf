using UnityEngine;
using TMPro;

public class ResultsUI : MonoBehaviour
{
    public static ResultsUI Instance;

    [SerializeField] private GameObject resultsPanel;
    [SerializeField] private TMP_Text resultsText;

    private void Awake()
    {
        Instance = this;
        resultsPanel.SetActive(false);
    }

    public void ShowResults(bool iWon)
    {
        resultsPanel.SetActive(true);

        if (iWon)
        {
            resultsText.text = "🎉 ¡GANASTE! 🎉";
            resultsText.color = Color.green;
        }
        else
        {
            resultsText.text = "❌ Perdiste ❌";
            resultsText.color = Color.red;
        }
    }
}
