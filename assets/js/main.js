const app = (function() {

    const viewModel = {

        // data

        // you can make a ajax request and pull the required data
        items: [
            {
                "title": "Jaguar F",
                "image": "assets/img/item-71952-1543643929.jpg",
                "price": 530000,
                "quantity": ko.observable(0)
            },
                        {
                "title": "Jaguar X",
                "image": "assets/img/item-71952-1543643967.jpg",
                "price": 4800000,
                "quantity": ko.observable(0)
            },
                        {
                "title": "Jaguar Sedan",
                "image": "assets/img/item-71952-1543643996.jpg",
                "price": 7500000,
                "quantity": ko.observable(0)
            },
                        {
                "title": "Jaguar XF",
                "image": "assets/img/item-71952-1543644033.jpg",
                "price": 3500000,
                "quantity": ko.observable(0)
            },
                        {
                "title": "Jaguar E",
                "image": "assets/img/item-71952-1543644070.jpg",
                "price": 1000000,
                "quantity": ko.observable(0)
            },
                        {
                "title": "Jaguar SUV",
                "image": "assets/img/item-71952-1543644093.jpg",
                "price": 8500000,
                "quantity": ko.observable(0)
            },
        ],
        incItem: item => {
            const currentQuantity = item.quantity();
            item.quantity(currentQuantity + 1);
        },
        decItem: item => {
            const currentQuantity = item.quantity();
            item.quantity(currentQuantity - 1);
        },
        lightbox: {
            shown: ko.observable(false),
            image: ko.observable('')
        },
        orderInfo: {
            username: ko.observable("").extend({
                required: true,
                minLength: 3,
                maxLength: 38
            }),
            mobile: ko.observable("").extend({ 
                required: true,
                pattern: {
                    message: "Enter a valid phone number",
                    params: "^[0-9]{10}$"
                }
            }),
            email: ko.observable("").extend({
                required: true,
                email: true
            }),
            isValid: ko.pureComputed(() => {
                return viewModel.orderInfo.username.isValid()
                    && viewModel.orderInfo.mobile.isValid()
                    && viewModel.orderInfo.email.isValid();
            })
        },

        // computed properties

        cartTotal: ko.pureComputed(() => {
            return viewModel.getItemsInCart()
                .map(item => item.itemTotal)
                .reduce((prev, curr) => prev + curr, 0);
        }),

        getItemsInCart: ko.pureComputed(() => {
            return viewModel.items
                .filter( item => item.quantity() > 0 )
                .map( item => { 
                    return {
                        itemName: item.title,
                        itemPrice: item.price,
                        itemQuantity: item.quantity,
                        itemTotal: item.price * item.quantity()
                    }
                } );

        }),

        // methods

        placeOrder: () => {
            
            // TODO complete

            // ...perform you request here
            
            viewModel.resetCart();
        },

        handleOrderResponse: () => {

            // TODO complete

            // ...handle you order response here

        },

        resetCart: () => {
            viewModel.getItemsInCart().forEach(item => {
                item.itemQuantity(0);
            });
            viewModel.orderInfo.username("");
            viewModel.orderInfo.mobile("");
            viewModel.orderInfo.email("");
        },

        showLightbox: item => {
            viewModel.lightbox.shown(true);
            viewModel.lightbox.image(item.image);
            viewModel.lockScroll();
        },

        hideLightbox: () => {
            viewModel.lightbox.shown(false);
            viewModel.lightbox.image('');
            viewModel.lockScroll(false);
        },

        lockScroll: (lock = true) => {
            if (lock) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "initial";
            }
        }
    };

    ko.applyBindings(viewModel);

    return {
        viewModel: viewModel
    }

})();

