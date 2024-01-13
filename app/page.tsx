"use client";

import {
  FileSyncOutlined,
  FileDoneOutlined,
  FileExclamationOutlined,
  CloudSyncOutlined,
  PlusCircleOutlined,
  CloudUploadOutlined,
  FlagOutlined,
  FileTextOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import {
  ProCard,
} from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Result,
  Row,
  Space,
  Tooltip as TooltipAntd,
  Typography,
} from "antd";
import { useState } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

import styles from "./page.module.css";
import CoreLayout from "@/components/Core/Layout";
import AllAppEvents from "@/components/AppEvents/All";

const data = {
  labels: ["Erros", "Processados", "Avisos", "Registrados"],
  datasets: [
    {
      label: "registros",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Home() {
  const [pathname, setPathname] = useState("/");
  return (
    <CoreLayout title="Dashboard" greetings={true} path={pathname} setPathname={setPathname} extraNav={false} extraNavItems={[]}>
      <Row gutter={[8, 0]}>
        <Col span={16}>
          <ProCard direction="column" ghost>
            <ProCard gutter={16} ghost>
              <ProCard
                colSpan={24}
                style={{ marginBottom: 16 }}
                title="Recém-adicionados"
                tooltip="Os 3 últimos dossiês adicionados."
                extra={
                  <TooltipAntd title="Visualizar todos.">
                    <Button type="text" icon={<ExportOutlined />} />
                  </TooltipAntd>
                }
                headerBordered
              >
                <Row gutter={16} style={{ paddingTop: 5, paddingBottom: 8 }}>
                  <Col span={8}>
                    <Card bordered={false}>
                      <Card.Meta
                        title={
                          <div className={styles.cardTitle}>
                            <Avatar
                              size="small"
                              icon={<FileDoneOutlined />}
                              style={{ backgroundColor: "#87d068" }}
                            />
                            <Link href="/" className={styles.cardTitleSub}>
                              Dossiê #1
                            </Link>
                          </div>
                        }
                      />
                      <div className={styles.projectItemContent}>
                        <span className={styles.datetime} title="31/01/2000">
                          há alguns segundos atrás
                        </span>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false}>
                      <Card.Meta
                        title={
                          <div className={styles.cardTitle}>
                            <Avatar
                              size="small"
                              icon={<FileExclamationOutlined />}
                              style={{ backgroundColor: "#faad14" }}
                            />
                            <Link href="/" className={styles.cardTitleSub}>
                              Dossiê #1
                            </Link>
                          </div>
                        }
                      />
                      <div className={styles.projectItemContent}>
                        <span className={styles.datetime} title="31/01/2000">
                          há alguns segundos atrás
                        </span>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false}>
                      <Card.Meta
                        title={
                          <div className={styles.cardTitle}>
                            <Avatar
                              size="small"
                              icon={<FileSyncOutlined />}
                              style={{ backgroundColor: "#1677ff" }}
                            />
                            <Link href="/" className={styles.cardTitleSub}>
                              Dossiê #1
                            </Link>
                          </div>
                        }
                      />
                      <div className={styles.projectItemContent}>
                        <span className={styles.datetime} title="31/01/2000">
                          há alguns segundos atrás
                        </span>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </ProCard>
            </ProCard>
            <ProCard gutter={16} ghost>
              <ProCard
                colSpan={24}
                style={{ height: 390, }}
                bodyStyle={{ paddingTop: 5, paddingBottom: 8 }}
                title="Histórico de eventos"
                headerBordered
              >
                <AllAppEvents />
                {/* <List>
                  <List.Item key={1}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<FlagOutlined />} />}
                      title={
                        <>
                          <Typography.Text>189.999.999</Typography.Text>
                          &nbsp;
                          <span
                            style={{
                              fontWeight: "normal",
                            }}
                          >
                            iniciou uma nova sessão
                          </span>
                        </>
                      }
                      description={
                        <span
                          className={styles.datetime}
                          style={{
                            float: "right",
                          }}
                          title="Atualizado em;"
                        >
                          há alguns segundos atrás
                        </span>
                      }
                    />
                  </List.Item>
                  <List.Item key={2}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<FlagOutlined />} />}
                      title={
                        <>
                          <Typography.Text>189.999.999</Typography.Text>
                          &nbsp;
                          <span
                            style={{
                              fontWeight: "normal",
                            }}
                          >
                            iniciou uma nova sessão
                          </span>
                        </>
                      }
                      description={
                        <span
                          className={styles.datetime}
                          style={{
                            float: "right",
                          }}
                          title="Atualizado em;"
                        >
                          há alguns segundos atrás
                        </span>
                      }
                    />
                  </List.Item>
                  <List.Item key={3}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<FlagOutlined />} />}
                      title={
                        <>
                          <Typography.Text>189.999.999</Typography.Text>
                          &nbsp;
                          <span
                            style={{
                              fontWeight: "normal",
                            }}
                          >
                            iniciou uma nova sessão
                          </span>
                        </>
                      }
                      description={
                        <span
                          className={styles.datetime}
                          style={{
                            float: "right",
                          }}
                          title="Atualizado em;"
                        >
                          há alguns segundos atrás
                        </span>
                      }
                    />
                  </List.Item>
                </List> */}
              </ProCard>
            </ProCard>
          </ProCard>
        </Col>
        <Col span={8}>
          <ProCard direction="column" ghost>
            <ProCard
              colSpan={24}
              bodyStyle={{ padding: 10 }}
              style={{ marginBottom: 16 }}
            >
              <Row gutter={[8, 0]}>
                <Col span={8}>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {}}
                    icon={<PlusCircleOutlined />}
                    ghost
                    block
                  >
                    Adicionar
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {}}
                    icon={<CloudUploadOutlined />}
                    ghost
                    block
                  >
                    Enviar CSV
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {}}
                    icon={<CloudSyncOutlined />}
                    ghost
                    block
                  >
                    Atualizar
                  </Button>
                </Col>
              </Row>
            </ProCard>
            <ProCard
              colSpan={24}
              style={{ height: 550 }}
              title="Desempenho médio"
              tooltip="Desempenho dos últimos 7 dias."
              headerBordered
            >
              <PolarArea
                width={500}
                height={500}
                data={data}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </ProCard>
          </ProCard>
        </Col>
      </Row>
    </CoreLayout>
  );
}
