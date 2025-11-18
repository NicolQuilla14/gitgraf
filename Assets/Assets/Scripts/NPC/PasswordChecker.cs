using UnityEngine;
using TMPro;
using UnityEngine.UI;

public class PasswordCheckerTMP : MonoBehaviour
{
    public TMP_InputField inputField;   // Campo TMP
    public TMP_Text notificationText;   // Texto TMP

    private string correctPassword = "oscarelmejor";

    public void CheckPassword()
    {
        if (inputField.text == correctPassword)
        {
            notificationText.text = "✔ Contraseña correcta";
            notificationText.color = Color.green;
        }
        else
        {
            notificationText.text = "✖ Error en la contraseña";
            notificationText.color = Color.red;
        }
    }
}
