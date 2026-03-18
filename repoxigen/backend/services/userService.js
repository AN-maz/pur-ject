import {prisma} from '../lib/prisma.ts';
export const getUserProfile = async (userId) => {

    const user = await prisma.users.findFirst({
        where:{id_akun: userId},
        include:{
            // divisi:true,
            peminatan:true,
            jabatan:true
        }
    });

    if(!user){
        throw new Error("Profile user tidak ditemukan!")
    }
    return user;
};

