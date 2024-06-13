import { notifications } from '@mantine/notifications';



export const showErrorNotification=(title,text)=>{
    notifications.show({
        title: title,
        message: text,
        autoClose:2000,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],

            '&::before': { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      })
}