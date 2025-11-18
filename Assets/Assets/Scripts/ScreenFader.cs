using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ScreenFader : MonoBehaviour
{
    public Image fadeImage;
    public float fadeDuration = 1f;

    private Coroutine currentFade;

    void Awake()
    {
        if (fadeImage != null)
        {
            SetAlpha(0f);
        }
    }

    // Fade out: negro -> transparente
    public void FadeOut(System.Action onComplete = null)
    {
        StartFade(1f, 0f, onComplete);
    }

    // Fade in: transparente -> negro
    public void FadeIn(System.Action onComplete = null)
    {
        StartFade(0f, 1f, onComplete);
    }

    private void StartFade(float from, float to, System.Action onComplete)
    {
        if (currentFade != null)
            StopCoroutine(currentFade);

        currentFade = StartCoroutine(FadeRoutine(from, to, onComplete));
    }

    private IEnumerator FadeRoutine(float fromAlpha, float toAlpha, System.Action onComplete)
    {
        float time = 0f;

        while (time < fadeDuration)
        {
            float alpha = Mathf.Lerp(fromAlpha, toAlpha, time / fadeDuration);
            SetAlpha(alpha);
            time += Time.deltaTime;
            yield return null;
        }

        SetAlpha(toAlpha);
        onComplete?.Invoke();
    }

    private void SetAlpha(float alpha)
    {
        if (fadeImage != null)
        {
            Color c = fadeImage.color;
            c.a = alpha;
            fadeImage.color = c;
        }
    }
}
