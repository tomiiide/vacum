'use babel';

import VacumView from './vacum-view';
import { CompositeDisposable } from 'atom';
import { Pane } from 'atom';




export default {

  vacumView: null,
  notification: null,
  subscriptions: null,
  pane : null,

  activate(state) {

  this.vacumView = new VacumView(state.vacumViewState);
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vacum:clean': () => this.clean()
    }));
  },

  deactivate() {
    this.notification.destroy();
    this.subscriptions.dispose();
    this.vacumView.destroy();
  },

  serialize() {
    return {
      vacumViewState: this.vacumView.serialize()
    };
  },

  clean() {
    if ( activePane = atom.workspace.getActivePane()){
          activePane.saveItems();
          activePane.destroyInactiveItems();
              console.log('Vacum was activated!');

              this.notification = atom.notifications.addInfo('Vroom vroom. Everything tidy.',
               {
                 detail: 'Vacum',
                 dismissable: true,
                 icon: 'info',
               });
        }
  }



};
