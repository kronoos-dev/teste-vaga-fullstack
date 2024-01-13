"use client";

import {
  FileSyncOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  FileExclamationOutlined,
  CloudSyncOutlined,
  PlusCircleOutlined,
  CloudUploadOutlined,
  FlagOutlined,
  FileTextOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import {
  PageContainer,
  ProCard,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  List,
  Result,
  Row,
  Space,
  Statistic,
  Tooltip as TooltipAntd,
  Typography,
} from "antd";
import React, { ReactNode, useState } from "react";
import Link from "next/link";

import _defaultProps from "./_defaultProps";
import styles from "./Layout.module.css";
import { useRouter } from "next/navigation";

type CoreLayoutProps = {
  title: string;
  path: string;
  setPathname: Function;
  children: React.ReactNode;
  greetings: boolean;
  extraNav: boolean;
  extraNavItems: Array<ReactNode>;
};

const content = (
  <div className={styles.pageHeaderContent}>
    <div className={styles.avatar}>
      <Avatar
        size="large"
        src="https://cdn.discordapp.com/attachments/1195381315017637891/1195429105773068398/ai-desktop.png"
      />
    </div>
    <div className={styles.content}>
      <div className={styles.contentTitle}>
        Olá, Juliana e Lara Financeira Ltda!
      </div>
      <div>Resumo das suas atividades</div>
    </div>
  </div>
);

const CoreLayout: React.FC<CoreLayoutProps> = ({
  title,
  greetings,
  path,
  setPathname,
  children,
  extraNav,
  extraNavItems,
}) => {
  const router = useRouter();
  return (
    <div
      id="core-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        {..._defaultProps}
        title="File import"
        logo="https://cdn.discordapp.com/attachments/1195381315017637891/1195381523533275318/logo-colored-small.webp"
        location={{
          pathname: path,
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: "48rpx",
                display: "flex",
                height: 48,
                color: "rgba(255, 255, 255, 0.65)",
                alignItems: "center",
              }}
              href="https://github.com/smachs/teste-vaga-fullstack"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://cdn.discordapp.com/attachments/1195381315017637891/1195382553847288010/github.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: "0 16px",
                  marginInlineEnd: 10,
                }}
              />
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              // store route path name
              setPathname(item.path || "/");
              // redirect to route
              router.push(item.path || "/");
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer
          className={styles.pageHeaderGreetings}
          title={title === "" ? false : title}
          content={greetings === true ? content : false}
          extra={extraNav ? extraNavItems : false}
          extraContent={
            greetings === true ? (
              <Space size={24}>
                <Statistic title="Tempo médio" value={3} suffix="minutos" />
                <Statistic
                  title="Registros salvos"
                  value={1128}
                  prefix={<FileDoneOutlined />}
                />
              </Space>
            ) : (
              false
            )
          }
        >
          <div
            style={{
              height: "100vh",
              minHeight: 600,
            }}
          >
            {children}
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default CoreLayout;
