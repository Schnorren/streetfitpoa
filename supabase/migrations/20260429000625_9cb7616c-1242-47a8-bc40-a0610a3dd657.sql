REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

CREATE POLICY "Anyone can read product image objects"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'product-images'
    AND (
      public.has_role(auth.uid(), 'admin')
      OR auth.role() = 'anon'
      OR auth.role() = 'authenticated'
    )
  );