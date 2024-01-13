import {
  HomeOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: 'Dashboard',
        icon: <HomeOutlined />,
        href: true,
      },
      {
        path: '/dossier',
        name: 'Dossiês',
        icon: <FileProtectOutlined />,
        routes: [
          {
            path: '/dossier/all',
            name: 'Todos',
            icon: <FileDoneOutlined />,
            isUrl: true,
          },
          {
            path: '/dossier/audit',
            name: 'Auditoria',
            icon: <FileProtectOutlined />,
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
  appList: [
    {
      icon: 'https://cdn.discordapp.com/attachments/1195381315017637891/1195381523533275318/logo-colored-small.webp',
      title: 'Kroonos',
      desc: 'Líder em soluções de compliance.',
      url: 'https://kronoos.com/',
    },
  ],
};
