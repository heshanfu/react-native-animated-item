import React from 'react'
import { Animated, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native'
import PropTypes from 'prop-types'

const { width }     = Dimensions.get('window')
const ACTIONS_WIDTH = 150
const ACTIONS_TIME  = 200
class AnimatedItem extends React.Component {
    constructor(props){
        super(props)
        this.leftOffset = new Animated.Value(0)
        this.state = {
            expanded: false,
        }
    }

    onPress = () => {
        const { expanded } = this.state
        const { onItemSelected } = this.props
    
        if (expanded) {
          this.collapse()
        } else {
          this.expand()
        }
        onItemSelected()
      }
    
      expand = () => {
        Animated.timing(this.leftOffset, {
          toValue: -ACTIONS_WIDTH,
          duration: ACTIONS_TIME,
          useNativeDriver: true,
        }).start()
    
        this.setState({ expanded: true })
      }
    
      collapse = () => {
        Animated.timing(this.leftOffset, {
          toValue: 0,
          duration: ACTIONS_TIME,
          useNativeDriver: true,
        }).start()
    
        this.setState({ expanded: false })
      }

    render() {
        const animated = { transform: [{ translateX: this.leftOffset }] }
        const { 
            containerStyle, 
            actionStyle, 
            actionPress,
            actionItem,
            children } = this.props
        return(
            <Animated.View style={[styles.main, animated]}>
                <TouchableOpacity 
                    style={[styles.container, containerStyle]}
                    onPress={this.onPress}
                    activeOpacity={0.5}
                >
                    {children}
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionsContainer, actionStyle]}
                    onPress={actionPress}
                    activeOpacity={0.5}
                >
                    {actionItem}
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const FallbackAction = () => {
    return(
    <View>
        <Text>
            No Action
        </Text>
    </View>)
}

AnimatedItem.defaultProps = {
    containerStyle: {},
    actionStyle: {},
    actionPress: () => {},
    actionItem: FallbackAction()
}

AnimatedItem.propTypes = {
    containerStyle: PropTypes.object,
    actionStyle: PropTypes.object,
    actionPress: PropTypes.func,
    actionItem: PropTypes.element
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        width: width + ACTIONS_WIDTH,
        backgroundColor: '##FFFFFF'
    },
    container: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionsContainer: {
        width: ACTIONS_WIDTH,
        height: '100%',
        backgroundColor: '#EDF4FF',
        padding: 20,
        borderLeftColor: '#AFAFAF',
        borderLeftWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AnimatedItem