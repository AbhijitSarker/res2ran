import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const FoodCard = ({ item }) => {
    const { image, name, recipe, price, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = (item) => {
        console.log(item);
        if (user && user.email) {
            const cartItem = { menuItemId: _id, image, name, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Food Added to Cart",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    }
                })
        }
        else {
            Swal.fire({
                title: "Please login to order food",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="bg-slate-900 text-white absolute right-4 top-4 px-4 py-2 rounded-lg">${price}</p>
                <div className="card-body flex flex-col items-start">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <Link to={``}>
                            <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-b-4 border-0 border-black bg-slate-500 text-white">Order Now</button>
                        </Link>                    </div>
                </div>
            </div>
        </div>
    );
};



export default FoodCard;