"use client";

import { useState } from "react";
import { FileAddOutlined, FileTextOutlined } from "@ant-design/icons";
import { ProList } from "@ant-design/pro-components";
import { Button, Col, Progress, Row, Tag } from "antd";

import CoreLayout from "@/components/Core/Layout";

const data = [
  "Dossié #1",
  "Dossié #2",
  "Dossié #3",
  "Dossié #4",
  "Dossié #5",
  "Dossié #6",
  "Dossié #7",
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">Finalizado</Tag>,
  actions: [<a key="invite">Remover</a>],
  avatar: <FileTextOutlined />,
  content: (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>Progresso</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

export default function AllDossiersPage() {
  const [pathname, setPathname] = useState("/dossier/all");
  return (
    <CoreLayout
      title="Dossiês registrados"
      greetings={false}
      path={pathname}
      setPathname={setPathname}
      extraNav={true}
      extraNavItems={[
        <Button type="dashed" icon={<FileAddOutlined />}>Adicionar</Button>,
      ]}
    >
      <Row gutter={[8, 0]}>
        <Col span={24}>
          <ProList<any>
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
            }}
            metas={{
              title: {},
              subTitle: {},
              type: {},
              avatar: {},
              content: {},
              actions: {},
            }}
            dataSource={data}
          />
        </Col>
      </Row>
    </CoreLayout>
  );
}
