'use babel';

import VacumView from './vacum-view';
import { CompositeDisposable } from 'atom';

export default {

  vacumView: null,
  notification: null,
  subscriptions: null,

  activate(state) {
    this.vacumView = new VacumView(state.vacumViewState);
    this.notification = atom.notifications.addInfo('Vroom vroom. Everything tidy. - vacum',
     {
       detail: 'Vacum activated!',
       dismissable: true,
       icon: 'info',
     });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vacum:toggle': () => this.toggle()
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

  toggle() {
    console.log('Vacum was toggled!');
    return (
      true
    );
  }

};
