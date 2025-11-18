using UnityEngine;
using TMPro;
using Unity.Netcode;

public class WordCheck : MonoBehaviour
{
    [SerializeField] private TMP_InputField inputField;
    [SerializeField] private string correctWord = "OSCAR";  // palabra correcta

    public void CheckWord()
    {
        string text = inputField.text.Trim().ToLower();

        if (text == correctWord.ToLower())
        {
            Debug.Log("¡Palabra correcta!");

            // Avisar al GameManager que este jugador ganó
            GameManager.Instance.PlayerMetCondition();
        }
        else
        {
            Debug.Log("Palabra incorrecta...");
        }
    }
}
