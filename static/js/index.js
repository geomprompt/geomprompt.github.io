window.HELP_IMPROVE_VIDEOJS = false;

function applyCaptionAlignment() {
  const captions = document.querySelectorAll('.figure-card figcaption, .table-paper-caption');
  captions.forEach((caption) => {
    caption.classList.remove('multiline-caption');

    const style = window.getComputedStyle(caption);
    const lineHeight = parseFloat(style.lineHeight);
    if (Number.isNaN(lineHeight) || lineHeight <= 0) {
      return;
    }

    const lines = caption.scrollHeight / lineHeight;
    if (lines > 1.35) {
      caption.classList.add('multiline-caption');
    }
  });
}

function copyBibTeX() {
  const bibtexElement = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  if (!bibtexElement || !button) {
    return;
  }

  const copyText = button.querySelector('.copy-text');

  const setCopiedState = () => {
    button.classList.add('copied');
    if (copyText) {
      copyText.textContent = 'Copied';
    }
    setTimeout(() => {
      button.classList.remove('copied');
      if (copyText) {
        copyText.textContent = 'Copy';
      }
    }, 2000);
  };

  const textToCopy = bibtexElement.textContent || '';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy)
      .then(setCopiedState)
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedState();
      });
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = textToCopy;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  setCopiedState();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', () => {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (!scrollButton) {
    return;
  }

  if (window.pageYOffset > 300) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
});

window.addEventListener('load', applyCaptionAlignment);
window.addEventListener('resize', applyCaptionAlignment);
