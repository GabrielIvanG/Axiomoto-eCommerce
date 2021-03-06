import { Card, CircularProgress, ListItemText, TableCell } from '@material-ui/core';
import {
  Button,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import NextLink from 'next/link';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      state;
  }
}

function OrderHistory() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const classes = useStyles();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    reducer,
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title={`Historial de pedidos`}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Historial de pedidos" />
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Historial de pedidos
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>FECHA</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAGO</TableCell>
                          <TableCell>ENTREGADO</TableCell>
                          <TableCell>ACCCI??N</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>{order.createdAt.substring(20, 24)}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid ? `pagado ${order.paidAt}` : 'sin pagar'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `entregado ${order.deliveredAt}`
                                : 'sin entregar'}
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Detalles</Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
