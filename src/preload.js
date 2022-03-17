const hljs = require("highlight.js");

const md = require("markdown-it")({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});

window.addEventListener("DOMContentLoaded", () => {
    const textarea = document.querySelector("textarea");
    const iframe = document.querySelector("iframe");
    const viewIframe = document.querySelector(".goiframe");
    let isMarkDown = false;

    viewIframe.addEventListener("click", () => {
        if (!isMarkDown) {
            textarea.hidden = true;
            iframe.hidden = false;
            isMarkDown = true;
            iframe.src = `data:text/html;charset=utf-8,${md.render(textarea.value)}`;
            viewIframe.innerHTML = "editor";
        } else {
            textarea.hidden = false;
            iframe.hidden = true;
            isMarkDown = false;
            viewIframe.innerHTML = "markdown";
        }
    });

    textarea.addEventListener("keydown", (e) => {
      if (e.keyCode === 9) {
        e.preventDefault()
    
        textarea.setRangeText(
          '    ',
          textarea.selectionStart,
          textarea.selectionStart,
          'end'
        )
      }
    });
});