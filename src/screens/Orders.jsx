import { StyleSheet, View, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../services/shopService";
import OrderItem from "../components/OrderItem";
import Loader from "../components/styledComponents/Loader";
import StyledText from "../components/styledComponents/StyledText";

const Orders = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [orders, setOrders] = useState([]);

  const localId = useSelector((state) => state.authReducer.value.localId);

  const { data, isLoading, refetch } = useGetOrdersQuery(localId);

  const handleRefresh = async () => {
    setIsFetching(true);
    await refetch();
    setIsFetching(false);
  };

  useEffect(() => {
    if (data) {
      setOrders(Object.values(data).reverse())
    }
  }, [data])

  return (
    <View>
      {isLoading ? (
        <Loader style={{ marginTop: 350 }} />
      ) : orders.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={(orders)}
            renderItem={({ item }) => <OrderItem order={item} />}
            keyExtractor={(item) => item.id}
            refreshing={isFetching}
            onRefresh={handleRefresh}
          />
        </View>
      ) : (
        <View style={styles.container2}>
          <StyledText mediumItalic size22 alignCenter textAlign>Todavía no has realizado ninguna compra.</StyledText>
          <Image style={styles.image} source={require("../../assets/shopping-list.png")} />
          <StyledText bold size22 alignCenter textAlign>Haz tu primera compra para poder ver el historial aquí.</StyledText>
        </View>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  container2: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    opacity: 0.65,
  },
});