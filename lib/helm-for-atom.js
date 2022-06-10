'use babel';

import HelmForAtomView from './helm-for-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  helmForAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.helmForAtomView = new HelmForAtomView(state.helmForAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.helmForAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'helm-for-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.helmForAtomView.destroy();
  },

  serialize() {
    return {
      helmForAtomViewState: this.helmForAtomView.serialize()
    };
  },

  toggle() {
    console.log('HelmForAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
