using UnityEngine;
using TMPro;

public class PlayerEntryItem : MonoBehaviour
{
    [SerializeField] private TMP_Text playerNameText;
    [SerializeField] private TMP_Text readyStateText;

    public void SetInfo(ulong clientId, bool isReady)
    {
        playerNameText.text = $"Jugador {clientId}";
        readyStateText.text = isReady ? "✔ Listo" : "✖ No listo";

        readyStateText.color = isReady ? Color.green : Color.red;
    }
}
