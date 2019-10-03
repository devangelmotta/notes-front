/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.home';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Todas tus notas',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Guardas tus notas',
  },
  buttonSave: {
    id: `${scope}.buttonSave`,
    defaultMessage: 'Click para guardar',
  },
  buttonSaveLoading: {
    id: `${scope}.buttonSaveLoading`,
    defaultMessage: 'Guardando...',
  },
});
