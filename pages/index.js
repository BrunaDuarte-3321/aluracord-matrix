import React from 'react';
import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children} </Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 30px;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
}

/* function HomePage() {
  return (
    <div style={{ background: 'black' }}>
      <GlobalStyle />
      <Title tag="h2">Boas vindas de volta!</Title>
      <h2>Discordo - Alura Matirx</h2>
    </div>
  );
}
export default HomePage; */

export default function PaginaInicial() {
  const [username, setUserName] = React.useState(null);
  console.log(username);

  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            'url(https://baixarpapeldeparede.com/web/wallpapers/wallpaper-hd-harry-potter-32/thumbnail/lg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundImage:
              'url(https://tm.ibxk.com.br/2022/01/06/06090650586027.jpg?ims=1120x420)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              /* Navegação pages */
              roteamento.push('/chat');
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              onChange={function (event) {
                /* De onde o valor vem?? */
                const valor = event.target.value;

                /* Troca o valor da variável */
                /*  Através do React  e avisa quem precisa*/

                setUserName(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: 'rgba(0,0,0, .5)',
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: 'rgba(0,0,0, .50)',

              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                backgroundColor: 'rgba(0,0,0, .5)',
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
