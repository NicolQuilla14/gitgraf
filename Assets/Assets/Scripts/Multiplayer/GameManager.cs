using UnityEngine;
using Unity.Netcode;

public class GameManager : NetworkBehaviour
{
    // Para mostrar la UI de resultados
    public static GameManager Instance;

    private void Awake()
    {
        Instance = this;
    }

    // Este método puede ser llamado por cualquier jugador que “gana”
    // condición simple → por ejemplo, presionar un botón.
    public void PlayerMetCondition()
    {
        // Solo el host determina el ganador
        if (IsServer)
        {
            DeclareWinnerServerRpc(NetworkManager.Singleton.LocalClientId);
        }
        else
        {
            PlayerMetConditionServerRpc();
        }
    }

    [ServerRpc(RequireOwnership = false)]
    private void PlayerMetConditionServerRpc(ServerRpcParams rpcParams = default)
    {
        ulong winnerId = rpcParams.Receive.SenderClientId;
        DeclareWinnerServerRpc(winnerId);
    }

    // El host anuncia el ganador a todos
    [ServerRpc(RequireOwnership = false)]
    private void DeclareWinnerServerRpc(ulong winnerId)
    {
        DeclareWinnerClientRpc(winnerId);
    }

    // Cada cliente recibe si ganó o no
    [ClientRpc]
    private void DeclareWinnerClientRpc(ulong winnerId)
    {
        ulong myId = NetworkManager.Singleton.LocalClientId;

        bool iWon = (myId == winnerId);

        ResultsUI.Instance.ShowResults(iWon);
    }
}
