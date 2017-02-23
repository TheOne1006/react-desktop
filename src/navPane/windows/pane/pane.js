import React, { Component, PropTypes, Children } from 'react';
import Item from './item/item';
import Button from './button/button';
import styles from './style/windows10';

class Pane extends Component {
  static Item = Item;

  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
    canPaneToggle: PropTypes.bool,
    onPaneToggle: PropTypes.func,
    defaultIsPaneExpanded: PropTypes.bool,
    topHeaderStyle: PropTypes.object,
    paneCompactedLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paneExpandedLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    canPaneToggle: true,
    defaultIsPaneExpanded: true,
    paneCompactedLength: '48px',
    topHeaderStyle: {},
    paneExpandedLength: '200px'
  };

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      isPaneExpanded: props.defaultIsPaneExpanded
    };
  }

  toggleOpen = () => {
    if (this.props.onPaneToggle) this.props.onPaneToggle(!this.state.isPaneExpanded);
    this.setState({ isPaneExpanded: !this.state.isPaneExpanded });
  };

  render() {
    const { canPaneToggle, paneCompactedLength, paneExpandedLength } = this.props;

    const button = !canPaneToggle ? null : <Button style={styles.buttonStyle} onClick={this.toggleOpen}/>;

    let componentStyle = { ...styles.pane };

    if (canPaneToggle) {
      if (this.state.isPaneExpanded) componentStyle.width = paneExpandedLength;
      else componentStyle.width = paneCompactedLength;
    } else {
      componentStyle.width = paneExpandedLength;
    }

    const headerStyle = {
      ...styles.padding,
      ...this.props.topHeaderStyle
    }

    return (
      <div
        style={componentStyle}
      >
        <div style={headerStyle}/>
        {button}
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    return Children.map(this.props.items, (item, index) =>
      <Item
        key={index}
        isPaneExpanded={this.state.isPaneExpanded}
        title={item.props.title}
        icon={item.props.icon}
        push={item.props.push}
        onSelect={item.props.onSelect}
        selected={item.props.selected}
      />
    );
  }
}

export default Pane;
