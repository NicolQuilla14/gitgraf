using Unity.Netcode;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExitToMenu : MonoBehaviour
{
    [Header("Settings")]
    [Tooltip("Nombre exacto de la escena del menú principal")]
    public string mainMenuSceneName = "MainMenu";

    public void LeaveGame()
    {
        // Si estás en una partida de red (host o cliente), desconéctate
        if (NetworkManager.Singleton != null && NetworkManager.Singleton.IsListening)
        {
            if (NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer)
            {
                NetworkManager.Singleton.Shutdown();
            }
            else if (NetworkManager.Singleton.IsClient)
            {
                NetworkManager.Singleton.Shutdown();
            }
        }

        // Cargar la escena del menú principal
        SceneManager.LoadScene(mainMenuSceneName);
    }
}
