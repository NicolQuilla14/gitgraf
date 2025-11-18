using Unity.Netcode;
using UnityEngine;
using TMPro;

public class PlayerCountUI : MonoBehaviour
{
    public TMP_Text playerCountText;

    private void Update()
    {
        if (NetworkManager.Singleton != null)
        {
            int count = NetworkManager.Singleton.ConnectedClients.Count;
            playerCountText.text = $"Jugadores conectados: {count}/4";
        }
    }
}
