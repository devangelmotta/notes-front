/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadLogin, loadCreate } from './actions';
import { ServerError, WaitingLogin } from '../../components/Alerts';
import { Button, Image, Modal, Jumbotron, Card } from 'react-bootstrap';
import {
  TiUserOutline,
  TiDeviceLaptop,
  TiPlug,
  TiEdit,
  TiTrash,
} from 'react-icons/ti';
import { getObjectBody, setCookie } from '../../utils/getDataDeviceConnection';
import { useWindowDimensions } from '../../utils/getScreenSize';

function checkExistSession(sucess) {
  if (sucess) {
    var body = sucess.body !== undefined ? sucess.body : false;
    if (body) {
      var session = body.sessions !== undefined ? true : false;
      if (session) {
        if (body.sessions) {
          var listsession = body.data ? body.data : {};
          if (Array.isArray(listsession)) {
            return {
              session: true,
              notes: false,
              data: listsession,
            };
          } else return { session: false, notes: false, data: sucess.body };
        } else return { session: false, notes: false, data: sucess.body };
      } else {
        if (body.length > 0) {
          let { ip, fingerprint } = sucess.body[0];
          let { token } = sucess;
          let prepareObject = { ip, fingerprint, token };
          setCookie(prepareObject);
          return { session: false, notes: true, data: sucess.body };
        } else return { session: false, notes: false, data: [] };
      }
    } else return { session: false, notes: false, data: sucess.body };
  } else return { session: false, notes: false, data: sucess.body };
}
export function HomePage({ home, sendLogin, sendCreateNote }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const { height, width } = useWindowDimensions();
  const {
    loadLogin,
    sucessLogin,
    errorLogin,
    payloadLogin,
    loadNotes,
    sucessNotes,
    errorNotes,
    loadCreate,
    sucessCreate,
    errorCreate,
  } = home;
  const [stateNotes, setNotes] = useState(false);

  useEffect(() => {
    sendLogin();
  }, []);
  function RenderModal({ open, data }) {
    if (data)
      return (
        <Modal
          size="lg"
          show={open}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sesiones abiertas
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Quién eres tú?</p>
            {data.map((item, index) => {
              return (
                <Card
                  key={index}
                  style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}
                  onClick={() =>
                    prepareObjectLoginList(item.ip, item.fingerprint)
                  }
                >
                  <div
                    style={{
                      marginLeft: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <TiUserOutline size="1.5em" />{' '}
                      <span style={{ marginLeft: '10px' }}>
                        Os Name: {item.fingerprint.osName}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <TiDeviceLaptop size="1.5em" />{' '}
                      <span style={{ marginLeft: '10px' }}>
                        Device: Brand: {item.fingerprint.deviceBrand} - type:{' '}
                        {item.fingerprint.deviceType}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <TiPlug size="1.5em" />{' '}
                      <span style={{ marginLeft: '10px' }}>
                        IP Direction: {item.ip}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Modal.Body>
        </Modal>
      );
  }

  function RenderNotes(param) {
    let { data } = param;
    if (Array.isArray(data)) {
      return data.map((item, index) => {
        return (
          <Card
            key={index}
            style={{
              backgroundColor: '#e9ecef',
              cursor: 'pointer',
              width: '90%',
            }}
          >
            <div
              style={{
                marginLeft: '20px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <p>{item.text}</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '10px',
                marginRight: '20px',
              }}
            >
              <TiEdit /> <TiTrash />
            </div>
          </Card>
        );
      });
    }
    return <p />;
  }

  function RenderNewItem(item) {
    if (item) {
      return (
        <Card
          style={{
            backgroundColor: '#81C784',
            cursor: 'pointer',
            width: '90%',
            marginTop: '40px',
          }}
        >
          <div
            style={{
              marginLeft: '20px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                color: '#fff',
                fontFamily: 'Roboto',
                fontWeight: 'bolder',
                fontSize: '1.5em',
                marginBottom: '10px',
              }}
            >
              New
            </p>
            <p
              style={{
                color: '#fff',
                fontFamily: 'Roboto',
                fontWeight: 'bolder',
              }}
            >
              {item.data.text}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              marginBottom: '10px',
              marginRight: '20px',
            }}
          >
            <TiEdit /> <TiTrash />
          </div>
        </Card>
      );
    }
  }
  function selectData(selector) {
    if (sucessLogin) {
      var checkingSession = checkExistSession(sucessLogin);

      if (selector) {
        if (checkingSession) {
          if (selector === 'session') return checkingSession.session;
          else if (selector === 'data') return checkingSession.data;
          else if (selector === 'notes') {
            if (checkingSession.notes) return checkingSession.data;
            else return false;
          }
        }
      }
    }
  }

  function handleCreateNote(text) {
    try {
      sendCreateNote(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function prepareObjectLoginList(ip, fingerprint) {
    const sendParams = { ip, fingerprint, refreshToken: true };
    let data = await getObjectBody(sendParams);
    sendLogin(data);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: width < 900 ? 'column' : 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width < 900 ? '90%' : '40%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Image src={require('../../images/user/profile.png')} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <p>
            <FormattedMessage {...messages.subtitle} />
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Formik
            initialValues={{
              text: '',
            }}
            onSubmit={values => {
              handleCreateNote(values.text);
            }}
            validationSchema={yup.object().shape({
              text: yup
                .string('Eso no luce como texto')
                .min(2, '¿De verdad es una idea?')
                .max(600, 'Demasiado para recordar D:')
                .required('Si no escribes, no tienes qué guardar'),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <Field
                    name="text"
                    type="text"
                    component="textarea"
                    style={{ width: '100%' }}
                    className={
                      'form-control' +
                      (errors.text && touched.text ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div>
                  <div className="well" style={{ width: '100%' }}>
                    <Button block disabled={loadCreate} onClick={handleSubmit}>
                      {loadCreate ? (
                        <FormattedMessage {...messages.buttonSaveLoading} />
                      ) : (
                        <FormattedMessage {...messages.buttonSave} />
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {sucessCreate && <RenderNewItem data={sucessCreate} />}
        {sucessLogin && (
          <RenderModal open={selectData('session')} data={selectData('data')} />
        )}
        {errorLogin && <ServerError />}
        {errorCreate && <ServerError />}
        {errorNotes && <ServerError />}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width < 900 ? '90%' : '60%',
          height: '100%',
        }}
      >
        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
          <h3>
            <FormattedMessage {...messages.title} />
          </h3>
        </div>
        {sucessLogin ? <RenderNotes data={selectData('notes')} /> : null}
      </div>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendLogin: login => {
      if (login) dispatch(loadLogin(login));
      else dispatch(loadLogin({}));
    },
    sendCreateNote: text => dispatch(loadCreate(text)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
