import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {ContainerFluid, PluginHeader} from 'strapi-helper-plugin';
import pluginId from '../pluginId';
import MenuEditor from '../components/MenuEditor';
import { onChange, submit, getMenu} from '../redux/actions';
import reducer from '../redux/reducer';
import saga from '../redux/saga';
import selectMenuEditorPlugin from '../redux/selectors';
import styled from 'styled-components'
import Modal from 'react-modal';
import { Button } from 'strapi-helper-plugin'

const Hint = styled.div`
  font-size: 1em;
  margin-bottom: 10px;
`

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class MenuEditorPlugin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      modalOpen: false,
    };
  }
  componentDidMount() {
    this.getMenu();
  }

  getMenu = () => {
    this.props.getMenu();
  };

  handleShowModal = () => {
    this.setState({modalOpen: true})
  }

  handleCloseModal = () => {
    this.setState({modalOpen: false})
  }

  handleSubmit = e => {
    // e.preventDefault();
    this.setState({editMode: false, modalOpen: false});
    return this.props.submit();
  };

  cancelEditMode = () => {
    this.props.getMenu();
    this.setState({editMode: false})
  }

  pluginHeaderActions = [
    {
      kind: 'secondary',
      label: 'menu-editor.MenuEditor.cancelEditMode',
      onClick: this.handleShowModal,
      type: 'button',
    },
    {
      kind: 'primary',
      label: 'app.components.Button.save',
      onClick: this.handleShowModal,
      type: 'submit',
    },
  ];
  actionEdit = [
    {
      kind: 'primary',
      label: 'menu-editor.MenuEditor.editMode',
      onClick: () => this.setState({editMode: true}),
      type: 'button',
    },
  ]

  render() {
    return (
      <Fragment>
        {/*<form onSubmit={this.handleSubmit}>*/}
          <ContainerFluid>
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.handleCloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <p>Uložit aktualní stav struktury?</p>
              <Button kind="primary" onClick={this.handleSubmit}>Ano</Button>
              <Button kind="secondary" onClick={this.handleCloseModal}>Ne</Button>
            </Modal>
            <PluginHeader
              title={{id: 'menu-editor.MenuEditor.title'}}
              description={{id: 'menu-editor.MenuEditor.description'}}
              actions={this.state.editMode ? this.pluginHeaderActions : this.actionEdit}
            />
            <Hint>Pozn.: Pro editaci stuktury webu přepnout do "Edit modu".</Hint>
            <MenuEditor
              menuItems={this.props.menuItems}
              modifiedMenuItemsData={this.props.modifiedMenuItemsData}
              editMode={this.state.editMode}
              // editMode={true}
              onChange={this.props.onChange}
            />
          </ContainerFluid>
        {/*</form>*/}
      </Fragment>
    );
  }
}

MenuEditorPlugin.defaultProps = {
  menuItems: [],
};

MenuEditorPlugin.propTypes = {
  menuItems: PropTypes.array.isRequired,
  getMenu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMenu,
      onChange,
      submit,
    },
    dispatch
  );
}

const mapStateToProps = selectMenuEditorPlugin();

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: 'menuEditor',
  reducer,
  pluginId,
});

const withStrapiSaga = strapi.injectSaga({key: 'menuEditor', saga, pluginId});

export default compose(
  withReducer,
  withStrapiSaga,
  withConnect
)(MenuEditorPlugin);
