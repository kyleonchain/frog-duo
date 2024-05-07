import { createSystem } from 'frog/ui'
 
export const {
    Box,
    Columns,
    Column,
    Divider,
    Heading,
    HStack,
    Icon,
    Image,
    Rows,
    Row,
    Spacer,
    Text,
    VStack,
    vars,
  } = createSystem({
    colors: {
        text: '#4b4b4b',
        background: '#ffffff',
        Cardinal: '#ff4b4b',
        MaskGreen: '#89E219',
        FeatherGreen: '#58CC02',
        Humpback: '#2b70c9',
        Fox: '#ff9600',
      },
      fonts: {
        default: [
            {
                name: 'PT Sans',
                source: 'google',
                weight: 400,
            }
        ]
    }
})



