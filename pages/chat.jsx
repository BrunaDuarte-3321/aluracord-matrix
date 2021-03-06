import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

function escutaMensagemEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', ({ respostaLive }) => {
      adicionaMensagem(respostaLive);
    })
    .subscribe();
}
const SUPABASE_NO_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5OTYyNCwiZXhwIjoxOTU4ODc1NjI0fQ.Ops44wpx5DqrnNcPrNxGj5luERR4ZP-CnjI0Wpv4W9Y';
const SUPABSE_URL = 'https://jkaynxiqjxskccpgkngg.supabase.co';
const supabaseClient = createClient(SUPABSE_URL, SUPABASE_NO_KEY);

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListaDeMesangem] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMesangem(data);
      });
    escutaMensagemEmTempoReal((novaMensagem) => {
      console.log('Nova mensagem teste', novaMensagem);
      setListaDeMesangem((valorAtualdaLista) => {
        return [novaMensagem, ...valorAtualdaLista];
      });
    });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      /* id: listaDeMensagens.length + 1, */
      de: usuarioLogado,
      texto: novaMensagem,
    };
    supabaseClient.from('mensagens').then(({ data }) => {
      console.log('Criando mensagem', data);
    });

    setMensagem('');
  }
  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://baixarpapeldeparede.com/web/wallpapers/wallpaper-hd-harry-potter-32/thumbnail/lg.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: 'rgba(0,0,0, .7)',
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: 'rgba(0,0,0, .5)',
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
            backgroundImage:
              'url(https://tm.ibxk.com.br/2022/01/06/06090650586027.jpg?ims=1120x420)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
            return (
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}: {mensagemAtual.texto}
              </li>
            );
          })} */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  console.log(event);
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                console.log('usando co coponente sala esse sticker', sticker);
                handleNovaMensagem(`:sticker: ${sticker}`);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          label="Logout"
          href="/"
          styleSheet={{
            color: 'white',
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log('MessageList', props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        /* overflow: 'scroll', */
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto.startsWith(':sticker:') ? (
              <Image src={mensagem.texto.replace(':sticker:', '')} />
            ) : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}
