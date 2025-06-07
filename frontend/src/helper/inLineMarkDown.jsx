export function parseInlineMarkdown(text) {
    if (!text) return text;
  
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return <strong key={idx}>{boldText}</strong>;
      }
      return part;
    });
  }