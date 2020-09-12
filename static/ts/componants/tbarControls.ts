export class TBarControls {
  current: string;
  cells: string[];
  articleName: string | null;

  constructor(current: string) {
    this.current = current;
    this.cells = current.split('/');
    if (!this.current.endsWith('/')){
      this.articleName = this.cells.pop();
    } else this.articleName = null;
  }

  open_folder(link: string): () => void {
    return function(){
      window.location.hash = link;
    }
  }

  getUrlControl(): HTMLElement {
    let vw = window.innerWidth;
    let vh = 2.75*window.innerHeight/100.0;
    let matches = vw > (this.current.length * vh);
    let out = document.createElement('div');
    out.id = "folder__control";
    let root_link = document.createElement('span');
    root_link.classList.add('folder__link');
    root_link.textContent = '/';
    root_link.addEventListener('click', this.open_folder('/'));
    out.append(root_link);
    let th_link = '/';
    let fold_links = this.cells.slice(1).map((chunk) => {
      if (chunk !== '') {
        th_link = th_link.concat(`${chunk}/`);
        let fold_link = document.createElement('span');
        fold_link.classList.add('folder__link');
        fold_link.textContent = (matches)? `${chunk}/`:'./';
        fold_link.addEventListener('click', this.open_folder(th_link));
        return fold_link;
      }
    }).filter((value) => value !== undefined);
    out.append(...fold_links);
    if (this.articleName) {
      let art = document.createElement('span');
      art.textContent = this.articleName;
      out.append(art);
    }
    return out;
  }
}
