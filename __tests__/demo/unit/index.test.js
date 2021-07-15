import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/demo/Header/index';
import { getElement } from '../../../src/utils/testUtils';

// 测试代码  单元测试的形式
describe('单元测试header 组件', () => {
    console.log(100000000)
    it('内容是不是123', () => {
        // 获取浅层Header组件，就是只能获取Header内部， Header的子元素内部获取不到， 需要获取需要用mount
        const wrapper = shallow(<Header />);
        const element = getElement(wrapper, 'div');
        expect(element.text()).toBe('023');
    });

    it('onClick 事件掉用之后，state 的name属性是不是666', () => {
        const wrapper = shallow(<Header />);

        const element = getElement(wrapper, 'div');
        const element1 = getElement(wrapper, 'div1');
        // 主动触发元素上注册的事件
        element.simulate('click', {
            key: 13
        });
        expect(element1.text()).toBe('0');
    });

    it('内容没有变化测试', () => {
        const wrapper = shallow(<Header />);
        // 使用快照测试我们组件的整体结构有没有变化
        expect(wrapper).toMatchSnapshot();
    })
})



// wrapper.instance().handelClick是获取类组件内部的this， 从而获取类组件中的方法
// wrapper.prop('children')是获取类组件内部的props，
// wrapper.state('name')是获取类组件内部的state，
// wrapper.setState()调用类组件的setState
// 获取的组件索引要通过List.at(索引)， 获取对应的元素
// 获取的组件索引要通过wrapper.find('Footer')， 获取组件内部的元素和组件
// 更新组件最新内容wrapper.update()
// 获取组件dom结构wrapper.debug()
