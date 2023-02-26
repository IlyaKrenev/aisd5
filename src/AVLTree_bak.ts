const BalanceState = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

function getBalanceState(node) {
    const heightDifference = node.leftHeight() - node.rightHeight();

    switch (heightDifference) {
        case -2: return BalanceState.UNBALANCED_RIGHT;
        case -1: return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
        case 1: return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
        case 2: return BalanceState.UNBALANCED_LEFT;
        default: return BalanceState.BALANCED;
    }
}

class AVLNode extends TreeNode {
    left: AVLNode | undefined;
    right: AVLNode | undefined;
    height: number | null = null;
    key: number | null = null;

    constructor (data: number, key: number) {
        super(data);

        this.key = key;
    }

    rotateRight () {
        var other = this.left;
        this.left = other.right;
        other.right = this;
        this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
        other.height = Math.max(other.leftHeight(), this.height) + 1;
        return other;
    };

    rotateLeft () {
        var other = this.right;
        this.right = other.left;
        other.left = this;
        this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
        other.height = Math.max(other.rightHeight(), this.height) + 1;
        return other;
    };

    leftHeight () {
        if (!this.left) {
            return -1;
        }
        return this.left.height;
    };

    rightHeight () {
        if (!this.right) {
            return -1;
        }
        return this.right.height;
    };
}

class AVLTree extends BinSearchTree {
    rootNode: AVLNode | undefined = undefined;

    override insertNode (node: AVLNode): AVLNode {
        this.rootNode = this._insert(node, this.rootNode);

        return node;
    }

    _compare (a: AVLNode, b: AVLNode) {
        if (a.key > (b?.data || null)) {
            return 1;
        }

        if (a.key < (b?.data || null)) {
            return -1;
        }

        return 0;
    };

    _insert (node: AVLNode, root: AVLNode) {
        if (root === undefined) {
            return node;
        }

        if (this._compare(node, root) < 0) {
            root.left = this._insert(node, (root?.left || undefined));
        } else if (this._compare(node, root) > 0) {
            root.right = this._insert(node, (root?.right || undefined));
        } else {
            return root;
        }

        root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
        var balanceState = getBalanceState(root);

        if (balanceState === BalanceState.UNBALANCED_LEFT) {
            if (this._compare(node, root.left) < 0) {
                root = root.rotateRight();
            } else {
                root.left = root.left.rotateLeft();
                return root.rotateRight();
            }
        }

        if (balanceState === BalanceState.UNBALANCED_RIGHT) {
            if (this._compare(node, root.right) > 0) {
                root = root.rotateLeft();
            } else {
                root.right = root.right.rotateRight();
                return root.rotateLeft();
            }
        }

        return root;
    };
}
