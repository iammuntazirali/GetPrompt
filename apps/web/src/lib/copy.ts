
export async function copyToClipboard(text: string): Promise<void> {
  if (!text) return Promise.reject(new Error("No text to copy"));

  // Try modern API
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      // fall through to legacy method
    }
  }

  // Fallback: textarea + execCommand
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    // Avoid scrolling to bottom
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.padding = "0";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.boxShadow = "none";
    textarea.style.background = "transparent";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!successful) throw new Error("execCommand copy failed");
  } catch (err) {
    return Promise.reject(err);
  }
}
