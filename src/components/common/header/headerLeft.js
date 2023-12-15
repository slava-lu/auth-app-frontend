import { Box, Flex, Drawer, DrawerBody, DrawerOverlay, DrawerContent, IconButton } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLeftMenuMobile } from 'modules/ui'
import { CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import LeftMenu from '../../menus/leftMenu'

const HeaderLeft = () => {
  const isMenuOpen = useSelector((state) => state.ui.isLeftMenuOpen)
  const dispatch = useDispatch()
  const router = useRouter()
  const isHome = router.pathname === '/'

  return (
    <Box as='section'>
      {!isHome && (
        <Flex py={{ base: '2', sm: '8' }} mr={{ base: '0', sm: '20' }} display={{ base: 'none', md: 'flex' }}>
          <LeftMenu />
        </Flex>
      )}
      <Drawer isOpen={isMenuOpen} placement='left' onClose={() => dispatch(toggleLeftMenuMobile(!isMenuOpen))}>
        <DrawerOverlay />
        <DrawerContent>
          <Box m={5} border>
            <IconButton
              colorScheme='teal'
              aria-label='Open Menu'
              size='lg'
              icon={<CloseIcon />}
              onClick={() => dispatch(toggleLeftMenuMobile(!isMenuOpen))}
            />
          </Box>
          <DrawerBody mt='10px'>
            <LeftMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default HeaderLeft
