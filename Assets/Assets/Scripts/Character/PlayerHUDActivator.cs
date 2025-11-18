using UnityEngine;
using UnityEngine.SceneManagement;
using Unity.Netcode;

public class PlayerHUDActivator : NetworkBehaviour
{
    public GameObject HUD;   // El HUD dentro del prefab del jugador

    private void Start()
    {
        // Asegurar que el HUD comienza desactivado
        if (HUD != null)
            HUD.SetActive(false);

        // Solo el dueño del jugador debe activar el HUD
        if (!IsOwner) return;

        // Revisamos si ya estamos en la escena correcta
        CheckSceneAndActivateHUD();

        // Escuchar cambios de escena (por si vienen del lobby)
        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        CheckSceneAndActivateHUD();
    }

    private void CheckSceneAndActivateHUD()
    {
        if (!IsOwner) return;

        // Cuando estemos en la escena "GameScene"
        if (SceneManager.GetActiveScene().name == "GameScene")
        {
            if (HUD != null)
                HUD.SetActive(true);
        }
        else
        {
            if (HUD != null)
                HUD.SetActive(false);
        }
    }

    private void OnDestroy()
    {
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }
}
