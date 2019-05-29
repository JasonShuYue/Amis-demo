import * as React from 'react';
import { RouteComponentProps, Route, Link, Switch, Redirect } from 'react-router-dom';
import {
    Layout,
    Button,
    AsideNav
} from 'amis';
import { IMainStore } from '../../stores';
import { inject, observer } from 'mobx-react';
import UserInfo from '../../components/UserInfo';
import { mapTree } from 'amis/lib/utils/helper';
import Dashboard from './Dashboard';
import SystemMg from './SystemMg';
import UserMg from './UserMg';
import MyGroup from './MyGroup';
import BasicForm from './form/Basic';
import AdvancedForm from './form/Advanced';
import Wizard from './form/Wizard';
import CourseMgt from "./CourseMgt";

const navigations = [
    {
        // label: '导航',
        children: [
            // {
            //     path: 'dashboard',
            //     label: '我的小组',
            //     icon: 'glyphicon glyphicon-signal',
            //     component: Dashboard
            // },
            //
            // {
            //     label: '表单页面',
            //     icon: 'glyphicon glyphicon-edit',
            //     children: [
            //         {
            //             label: '常规表单',
            //             path: 'form/basic',
            //             component: BasicForm
            //         },
            //
            //         {
            //             label: '复杂表单',
            //             path: 'form/advanced',
            //             component: AdvancedForm
            //         },
            //
            //         {
            //             label: '向导',
            //             path: 'form/wizard',
            //             component: Wizard
            //         }
            //     ]
            // },

            {
              path: "mygroup",
              label: "我的小组",
              component: MyGroup
            },

            {
                path: "usermg",
                label: "用户管理",
                component: UserMg
            },

            {
                path: 'coursemgt',
                label: '课程管理',
                component: CourseMgt
            },


            {
                path: "systemmg",
                label: "系统管理",
                component: SystemMg
            },
        ]
    },
];

const PATH_PREFIX = '/admin';
function navigations2route(pathPrefix = PATH_PREFIX) {
    let routes:Array<JSX.Element> = [];

    navigations.forEach(root => {
        root.children && mapTree(root.children, (item:any) => {
            if (item.path && item.component) {
                routes.push(
                    <Route key={routes.length + 1} path={item.path[0] === '/' ? item.path : `${pathPrefix}/${item.path}`} component={item.component} />
                )
            } else if (item.path && item.getComponent) {
                routes.push(
                    <Route key={routes.length + 1} path={item.path[0] === '/' ? item.path : `${pathPrefix}/${item.path}`} getComponent={item.getComponent} />
                )
            }
        });
    });

    return routes;
}

function isActive(link:any, location:any) {
    return !!(link && link === location.pathname);
}

export interface AdminProps extends RouteComponentProps<any>  {
    store: IMainStore
};

@inject("store")
@observer
export default class Admin extends React.Component<AdminProps> {
    renderHeader() {
        const store = this.props.store;

        return (
            <div>
                <div className={`a-Layout-brandBar`}>
                    <button
                        onClick={store.toggleOffScreen}
                        className="pull-right visible-xs"
                    >
                        <i className="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <div className={`a-Layout-brand`}>
                        <i className="fa fa-paw"></i>
                        <span className="hidden-folded m-l-sm">AMis Boilerplate</span>
                    </div>
                </div>
                <div className={`a-Layout-headerBar`}>
                    <div className="nav navbar-nav hidden-xs">
                        <Button
                            level="link"
                            className="no-shadow navbar-btn"
                            onClick={store.toggleAsideFolded}
                            tooltip="展开或收起侧边栏"
                            placement="bottom"
                            iconOnly
                        >
                            <i className={store.asideFolded ? 'fa fa-indent' : 'fa fa-dedent'} />
                        </Button>
                    </div>

                    <div className="hidden-xs p-t-sm pull-right">
                        <UserInfo user={store.user} />
                    </div>
                </div>
            </div>
        );
    }

    renderAside() {
        const location = this.props.location;
        const store = this.props.store;
        

        return (
            <AsideNav
                key={store.asideFolded ? 'folded-aside' : 'aside'}
                navigations={navigations}
                renderLink={({link, active, toggleExpand, classnames: cx}:any) => {
                    let children = [];

                    if (link.children) {
                        children.push(
                            <span
                                key="expand-toggle"
                                className={cx('AsideNav-itemArrow')}
                            ></span>
                        );
                    }

                    link.badge && children.push(
                        <b key="badge" className={cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info')}>{link.badge}</b>
                    );

                    if (link.icon) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />
                        );
                    } else if (store.asideFolded) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, 'fa fa-file')} />
                        );
                    }

                    children.push(
                        <span className={cx(`AsideNav-itemLabel`)} key="label">{link.label}</span>
                    );

                    return link.path ? (<Link to={link.path[0] === '/' ? link.path : `${PATH_PREFIX}/${link.path}`}>{children}</Link>) : (<a onClick={link.children ? () => toggleExpand(link) : null}>{children}</a>);
                }}
                isActive={(link:any) => isActive(link.path && link.path[0] === '/' ? link.path : `${PATH_PREFIX}/${link.path}`, location)}
            />
        );
    }


    render() {
        const store = this.props.store;

        return (
            <Layout
                aside={this.renderAside()}
                // header={this.renderHeader()}
                // folded={store.asideFolded}
                // offScreen={store.offScreen}
            >
                <Switch>
                    <Redirect to={`${PATH_PREFIX}/dashboard`} from={`${PATH_PREFIX}/`} exact />
                    {navigations2route()}
                    <Redirect to="/404" />
                </Switch>
            </Layout>
        );
    }
}