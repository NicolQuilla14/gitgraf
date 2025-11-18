using UnityEngine;
using Unity.Netcode;
using System.Collections.Generic;

public class LobbyUIManager : NetworkBehaviour
{
    [SerializeField] private LobbyManager lobbyManager;
    [SerializeField] private Transform playerListContainer;
    [SerializeField] private GameObject playerEntryPrefab;

    private Dictionary<ulong, PlayerEntryItem> spawnedEntries = new Dictionary<ulong, PlayerEntryItem>();

    private void OnEnable()
    {
        if (lobbyManager != null)
        {
            lobbyManager.OnLobbyStateUpdated += RefreshUI;
        }
    }

    private void OnDisable()
    {
        if (lobbyManager != null)
        {
            lobbyManager.OnLobbyStateUpdated -= RefreshUI;
        }
    }

    private void RefreshUI(Dictionary<ulong, bool> readyStates)
    {
        // Destruir UI anterior
        foreach (var entry in spawnedEntries.Values)
        {
            Destroy(entry.gameObject);
        }
        spawnedEntries.Clear();

        // Crear UI actualizada
        foreach (var kvp in readyStates)
        {
            ulong clientId = kvp.Key;
            bool isReady = kvp.Value;

            GameObject obj = Instantiate(playerEntryPrefab, playerListContainer);
            PlayerEntryItem entry = obj.GetComponent<PlayerEntryItem>();
            entry.SetInfo(clientId, isReady);

            spawnedEntries[clientId] = entry;
        }
    }
}
