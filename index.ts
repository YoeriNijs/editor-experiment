import './style.css';

type CharStyle = 'bold' | 'italic' | 'underline';

interface IChar {
  char: string;
  style?: CharStyle[];
}

interface IRow {
  chars: IChar[];
}

enum ButtonType {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
}

const createButton = (type: ButtonType) => {
  const btn = document.createElement('button');
  btn.innerText = type;
  btn.onclick = () => btn.dispatchEvent(new Event(type, { bubbles: true }));
  return btn;
};

const closeAllTools = (): void => {
  const toolWindows = document.querySelectorAll('#editor .tool-window');
  if (toolWindows)
    Array.from(toolWindows).forEach((t: HTMLElement) => t.remove());
};

const createToolWindow = (): HTMLElement => {
  const toolWindow = document.createElement('div');
  toolWindow.classList.add('tool-window');

  toolWindow.appendChild(createButton(ButtonType.BOLD));
  toolWindow.appendChild(createButton(ButtonType.ITALIC));
  toolWindow.appendChild(createButton(ButtonType.UNDERLINE));

  return toolWindow;
};

const createCharElement = (c: IChar): HTMLElement => {
  const charElement = document.createElement('span');
  charElement.innerText = c.char;
  if (c.style) c.style.forEach((style) => charElement.classList.add(style));

  charElement.onclick = () => {
    closeAllTools();

    charElement.addEventListener(
      ButtonType.BOLD,
      () => {
        charElement.classList.toggle(ButtonType.BOLD);
        setTimeout(() => closeAllTools());
      },
      false
    );
    charElement.addEventListener(
      ButtonType.ITALIC,
      () => {
        charElement.classList.toggle(ButtonType.ITALIC);
        setTimeout(() => closeAllTools());
      },
      false
    );
    charElement.addEventListener(
      ButtonType.UNDERLINE,
      () => {
        charElement.classList.toggle(ButtonType.UNDERLINE);
        setTimeout(() => closeAllTools());
      },
      false
    );

    const toolWindow = createToolWindow();
    charElement.appendChild(toolWindow);
  };

  return charElement;
};

const createRowElement = (row: IRow): HTMLElement => {
  const divElement = document.createElement('div');
  row.chars
    .map((c) => createCharElement(c))
    .forEach((c) => divElement.appendChild(c));
  return divElement;
};

const rows: IRow[] = [
  {
    chars: [
      { char: 'h', style: ['bold'] },
      { char: 'e', style: ['bold', 'underline'] },
      { char: 'l', style: ['italic'] },
      { char: 'l' },
      { char: 'o' },
    ],
  },
  {
    chars: [
      { char: 'w' },
      { char: 'o' },
      { char: 'r' },
      { char: 'l' },
      { char: 'd' },
    ],
  },
];

const editor: HTMLElement = document.getElementById('editor');
rows.map((r) => createRowElement(r)).forEach((el) => editor.appendChild(el));
