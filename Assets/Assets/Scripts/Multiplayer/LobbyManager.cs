using Unity.Netcode;
using System;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections.Generic;

public class LobbyManager : NetworkBehaviour
{
    public event Action<Dictionary<ulong, bool>> OnLobbyStateUpdated;

    [SerializeField] private string gameSceneName = "GameScene";

    // Diccionario local para el host
    private Dictionary<ulong, bool> playerReadyState = new Dictionary<ulong, bool>();

    private void OnEnable()
    {
        if (NetworkManager.Singleton != null)
        {
            NetworkManager.Singleton.OnClientConnectedCallback += OnClientConnected;
            NetworkManager.Singleton.OnClientDisconnectCallback += OnClientDisconnected;
        }
    }

    private void OnDisable()
    {
        if (NetworkManager.Singleton != null)
        {
            NetworkManager.Singleton.OnClientConnectedCallback -= OnClientConnected;
            NetworkManager.Singleton.OnClientDisconnectCallback -= OnClientDisconnected;
        }
    }

    private void OnClientConnected(ulong clientId)
    {
        Debug.Log($"Cliente conectado: {clientId}");

        if (IsServer)
        {
            // Por defecto, jugadores no están listos
            playerReadyState[clientId] = false;
        }

        // Después de agregar al diccionario ✔
        OnLobbyStateUpdated?.Invoke(playerReadyState);
    }

    private void OnClientDisconnected(ulong clientId)
    {
        Debug.Log($"Cliente desconectado: {clientId}");

        if (IsServer)
        {
            if (playerReadyState.ContainsKey(clientId))
                playerReadyState.Remove(clientId);

            CheckIfAllReady();
        }

        // Después de actualizar el diccionario ✔
        OnLobbyStateUpdated?.Invoke(playerReadyState);
    }

    // --- MÉTODO QUE ES LLAMADO DESDE EL BOTÓN DE UI ---
    public void ToggleReady()
    {
        if (IsClient)
        {
            ToggleReadyServerRpc();
        }
    }

    [ServerRpc(RequireOwnership = false)]
    private void ToggleReadyServerRpc(ServerRpcParams rpcParams = default)
    {
        ulong senderId = rpcParams.Receive.SenderClientId;

        if (!playerReadyState.ContainsKey(senderId))
            playerReadyState[senderId] = false;

        // Cambiar estado
        playerReadyState[senderId] = !playerReadyState[senderId];

        Debug.Log($"Jugador {senderId} listo = {playerReadyState[senderId]}");

        // Notificar a la UI después del cambio ✔
        OnLobbyStateUpdated?.Invoke(playerReadyState);

        // Revisar si todos están listos
        CheckIfAllReady();
    }

    private void CheckIfAllReady()
    {
        if (!IsServer) return;

        int connectedPlayers = NetworkManager.Singleton.ConnectedClientsList.Count;

        if (connectedPlayers == 0)
            return;

        foreach (var kvp in playerReadyState)
        {
            if (kvp.Value == false)
                return;
        }

        Debug.Log("🎉 ¡Todos los jugadores están listos! Iniciando partida...");
        StartGame();
    }

    private void StartGame()
    {
        NetworkManager.Singleton.SceneManager.LoadScene(gameSceneName, LoadSceneMode.Single);
    }
}
