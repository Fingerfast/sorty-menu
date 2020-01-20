import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {ContainerFluid, PluginHeader} from 'strapi-helper-plugin';
import pluginId from '../../pluginId';
import MenuEditor from '../../components/MenuEditor/MenuEditor';
import { onCancel, onChange, setErrors, submit, getMenu} from './actions';
import reducer from './reducer';
import saga from './saga';
import selectConfigPage from './selectors';

class ConfigPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }
  componentDidMount() {
    this.getMenu();
  }

  getMenu = () => {
    this.props.getMenu();
  };

  handleSubmit = e => {
    e.preventDefault();
    return this.props.submit();
  };

  pluginHeaderActions = [
    {
      kind: 'secondary',
      label: 'menu-editor.MenuEditor.cancelEditMode',
      onClick: () => this.setState({editMode: false}),
      type: 'button',
    },
    {
      kind: 'primary',
      label: 'app.components.Button.save',
      onClick: this.handleSubmit,
      type: 'submit',
    },
  ];
  actionEdit = [
    {
      kind: 'secondary',
      label: 'menu-editor.MenuEditor.editMode',
      onClick: () => this.setState({editMode: true}),
      type: 'button',
    },
  ]

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <ContainerFluid>
            <PluginHeader
              actions={this.state.editMode ? this.pluginHeaderActions : this.actionEdit}
              description={{id: 'menu-editor.ConfigPage.description'}}
              title={{id: 'menu-editor.ConfigPage.title'}}
            />
            <MenuEditor
              initialData={this.props.initialData}
              modifiedData={this.props.modifiedData}
              currentMenu={this.props.currentMenu}
              editMode={this.state.editMode}
              onChange={this.props.onChange}
            />
          </ContainerFluid>
        </form>
      </div>
    );
  }
}

ConfigPage.defaultProps = {
  appEnvironments: [],
  formErrors: [],
  initialData: [],
  modifiedData: [],
};

ConfigPage.propTypes = {
  appEnvironments: PropTypes.array,
  didCheckErrors: PropTypes.bool.isRequired,
  formErrors: PropTypes.array,
  getMenu: PropTypes.func.isRequired,
  initialData: PropTypes.array.isRequired,
  modifiedData: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMenu,
      onCancel,
      onChange,
      setErrors,
      submit,
    },
    dispatch
  );
}

const mapStateToProps = selectConfigPage();

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: 'configPage',
  reducer,
  pluginId,
});

const withSaga = strapi.injectSaga({key: 'configPage', saga, pluginId});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ConfigPage);
