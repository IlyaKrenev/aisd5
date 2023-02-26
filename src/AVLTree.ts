class AVLNode extends TreeNode{
    left: AVLNode;
    right: AVLNode;
    height: number;

    constructor(value) {
        super(value)
        this.left = null;
        this.right = null;
        this.height = 1;
    }

}

class AVLTree extends BinSearchTree{
    insert (root: AVLNode | null, key: number) {
        var b;

        if (!root) {
            return new AVLNode(key);
        } else {
            if (key < root.data) {
                root.left = this.insert(root.left, key);
            } else {
                root.right = this.insert(root.right, key);
            }
        }

        root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
        b = this.getBal(root);

        if (b > 1 && key < root.left.data) {
            return this.rRotate(root);
        }

        if (b < -1 && key > root.right.data) {
            return this.lRotate(root);
        }

        if (b > 1 && key > root.left.data) {
            root.left = this.lRotate(root.left);
            return this.rRotate(root);
        }

        if (b < -1 && key < root.right.data) {
            root.right = this.rRotate(root.right);
            return this.lRotate(root);
        }

        return root;
    }

    lRotate(z: AVLNode) {
        let y = z.right;
        let T2 = y.left;

        y.left = z;
        z.right = T2;

        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

        return y;
    }

    rRotate(z: AVLNode) {
        let y = z.left;
        let T3 = y.right;

        y.right = z;
        z.left = T3;

        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

        return y;
    }

    getHeight(root: AVLNode) {
        if (!root) {
            return 0;
        }

        return root.height;
    }

    getBal(root: AVLNode) {
        if (!root) {
            return 0;
        }

        return this.getHeight(root.left) - this.getHeight(root.right);
    }

}
