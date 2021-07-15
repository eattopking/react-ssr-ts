import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../../src/demo/Header/index';
import { getElement } from '../../src/utils/testUtils';
import { Provider } from 'react-redux';
import axios from 'axios';

// wrapper.instance().handelClick是获取类组件内部的this， 从而获取类组件中的方法
// wrapper.prop('children')是获取类组件内部的props，
// wrapper.state('name')是获取类组件内部的state，
// wrapper.setState()调用类组件的setState
// 获取的组件索引要通过List.at(索引)， 获取对应的元素
// 获取的组件索引要通过wrapper.find('Footer')， 获取组件内部的元素和组件
// 更新组件最新内容wrapper.update()
// 获取组件dom结构wrapper.debug()


// 测试操作集成测试, 测试用户的行为
describe('集成测试header 组件', () => {
    it('onClick 事件掉用之后，state 的name属性是不是666', () => {

        console.log('9999', axios.get())
        // 如果header内部引用了redux ，直接将store传给Header，不更改后面代码，可以继续测试
        // const wrapper = mount(<Provider store={store}><Header /></Provider>);
        const wrapper = mount(<Header />);

        const element = getElement(wrapper, 'div');
        const element1 = getElement(wrapper, 'div1');
        // 主动触发元素上注册的事件
        element.simulate('click', {
            key: 13
        });
        expect(element1.text()).toBe("666");
    });
})