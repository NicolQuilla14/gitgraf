using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MenuController : MonoBehaviour
{
    public ScreenFader screenFader;

    // Botones
    public Button btnJugar;
    public Button btnOpciones;
    public Button btnSalir;

    // Menús
    public GameObject mainMenu;
    public GameObject opcionesMenu;
    public GameObject juegoUI;

    void Start()
    {
        btnJugar.onClick.AddListener(OnJugarClicked);
        btnOpciones.onClick.AddListener(OnOpcionesClicked);
        btnSalir.onClick.AddListener(OnSalirClicked);
    }

    void OnSalirClicked()
    {
        // Fade In (pantalla negra), luego salir
        screenFader.FadeIn(() =>
        {
            Debug.Log("Saliendo del juego...");
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#else
            Application.Quit(); // Para build
#endif
        });
    }

    void OnOpcionesClicked()
    {
        // Fade In, luego cambia menú, luego Fade Out
        screenFader.FadeIn(() =>
        {
            mainMenu.SetActive(false);
            opcionesMenu.SetActive(true);

            screenFader.FadeOut();
        });
    }

    void OnJugarClicked()
    {
        // Fade In, luego carga la escena 1 (según Build Settings)
        screenFader.FadeIn(() =>
        {
            SceneManager.LoadScene(1);
        });
    }

}
