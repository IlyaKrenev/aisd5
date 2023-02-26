class RBNode extends TreeNode {
    red: boolean = false;
    parent: RBNode | null;
    left: RBNode | null = null;
    right: RBNode | null = null;
}

class RedBlackTree extends BinSearchTree {
    nil: RBNode | null;
    rootNode: RBNode | null;

    constructor () {
        super();

        this.nil = new RBNode(0);
        this.nil.red = false;
        this.nil.left = null;
        this.nil.right = null;
        this.rootNode = this.nil;
    }

    override insertNode (node: RBNode) {
        const new_node: RBNode = node;

        let parent: RBNode | null = null;
        let current: RBNode | null = null;

        new_node.parent = null;
        new_node.left = this.nil;
        new_node.right = this.nil;
        new_node.red = true;
        parent = null;
        current = this.rootNode;

        while (current !== this.nil) {
            parent = current;

            if (new_node.data < current.data) {
                current = current.left;
            } else {
                if (new_node.data > current.data) {
                    current = current.right;
                } else {
                    return;
                }
            }
        }

        new_node.parent = parent;

        if (parent === null) {
            this.rootNode = new_node;
        } else {
            if (new_node.data < parent.data) {
                parent.left = new_node;
            } else {
                parent.right = new_node;
            }
        }

        this.fix_insert(new_node);

        return node;
    }

    fix_insert(new_node: RBNode) {
        let u;

        while (new_node !== this.rootNode && new_node.parent.red) {
            if (new_node.parent === new_node.parent.parent.right) {
                u = new_node.parent.parent.left;

                if (u.red) {
                    u.red = false;
                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    new_node = new_node.parent.parent;
                } else {
                    if (new_node === new_node.parent.left) {
                        new_node = new_node.parent;
                        this.rotate_right(new_node);
                    }

                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    this.rotate_left(new_node.parent.parent);
                }
            } else {
                u = new_node.parent.parent.right;

                if (u.red) {
                    u.red = false;
                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    new_node = new_node.parent.parent;
                } else {
                    if (new_node === new_node.parent.right) {
                        new_node = new_node.parent;
                        this.rotate_left(new_node);
                    }

                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    this.rotate_right(new_node.parent.parent);
                }
            }
        }

        this.rootNode.red = false;
    }

    rotate_left (x: RBNode) {
        let y: RBNode;

        y = x.right;
        x.right = y.left;

        if (y.left !== this.nil) {
            y.left.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === null) {
            this.rootNode = y;
        } else {
            if (x === x.parent.left) {
                x.parent.left = y;
            } else {
                x.parent.right = y;
            }
        }

        y.left = x;
        x.parent = y;
    }

    rotate_right (x: RBNode) {
        let y;
        y = x.left;
        x.left = y.right;

        if (y.right !== this.nil) {
            y.right.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === null) {
            this.rootNode = y;
        } else {
            if (x === x.parent.right) {
                x.parent.right = y;
            } else {
                x.parent.left = y;
            }
        }

        y.right = x;
        x.parent = y;
    }
}
